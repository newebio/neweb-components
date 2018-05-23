import debug = require("debug");
import {
    IPage, IPageFrame,
    IRemoteFrameControllerDataParams, IRemoteFrameControllerDispatchParams,
} from "neweb-core";
import { Onemitter } from "onemitter";
import { BehaviorSubject, Subject } from "rxjs";
import { hydrate, replace } from "../render";
import Component from "./../Component";
import { IViewParams } from "./IViewParams";
export interface IClientPageRendererConfig {
    rootHtmlElement: HTMLElement;
    app: {
        getFrameViewClass: (pageFrame: IPageFrame) => any;
    };
}
class ClientPageRenderer {
    protected navigate: (url: string) => void;
    protected dispatch: (params: IRemoteFrameControllerDispatchParams) => Promise<void>;
    protected seansStatusEmitter: Onemitter<string>;
    protected networkStatusEmitter: Onemitter<string>;
    protected historyContext: any;
    protected views: { [index: string]: new (config: IViewParams<any, any, any>) => Component<any> } = {};
    protected frames: {
        [index: string]: {
            component: Component<any>;
            data: { [index: string]: Subject<any> };
            children: { [index: string]: BehaviorSubject<Component<any>> };
            params: BehaviorSubject<any>;
            pageFrame: IPageFrame;
        };
    } = {};
    protected currentPage: IPage;
    constructor(protected config: IClientPageRendererConfig) { }
    public setMethods(params: {
        navigate: (url: string) => void;
        dispatch: (params: IRemoteFrameControllerDispatchParams) => Promise<void>;
        seansStatusEmitter: Onemitter<any>;
        networkStatusEmitter: Onemitter<any>;
        historyContext: any;
    }) {
        this.navigate = params.navigate;
        this.dispatch = params.dispatch;
        this.seansStatusEmitter = params.seansStatusEmitter;
        this.networkStatusEmitter = params.networkStatusEmitter;
        this.historyContext = params.historyContext;
    }
    public async loadPage(page: IPage) {
        await this.loadViews(page);
        // create all frames
        page.frames.map((pageFrame) => {
            this.frames[pageFrame.frameId] = this.createFrame(pageFrame);
        });
        this.renderFrame(page.rootFrame, page);
        this.currentPage = page;
    }
    public async newPage(page: IPage) {
        debug("neweb:renderer")("new page", page);
        await this.loadViews(page);
        const frameIds: string[] = [];
        page.frames.map(async (frame) => {
            if (!this.frames[frame.frameId]) {
                this.frames[frame.frameId] = this.createFrame(frame);
                frameIds.push(frame.frameId);
            } else {
                const xFrame = this.frames[frame.frameId];
                if (JSON.stringify(xFrame.params.getValue()) !== frame.params) {
                    xFrame.params.next(frame.params);
                }
            }
        });
        // frameIds.map((frameId) => this.renderFrame(frameId, page));
        this.renderFrame(page.rootFrame, page);
        // TODO delete old frames
        if (this.currentPage.rootFrame !== page.rootFrame) {
            replace(this.frames[page.rootFrame].component, this.config.rootHtmlElement);
        }
        this.currentPage = page;
    }
    public async initialize() {
        hydrate(this.frames[this.currentPage.rootFrame].component, this.config.rootHtmlElement);
    }
    public emitFrameControllerData(params: IRemoteFrameControllerDataParams) {
        const frame = this.frames[params.frameId];
        if (frame) {
            frame.data[params.fieldName].next(params.value);
        }
    }
    protected async loadViews(page: IPage) {
        await Promise.all(page.frames.map(async (pageFrame) => {
            this.views[pageFrame.frameName] = await this.config.app.getFrameViewClass(pageFrame);
        }));
    }
    protected renderFrame(frameId: string, page: IPage) {
        const frame = this.frames[frameId];
        const pageFrame = page.frames.filter((f) => f.frameId === frameId)[0];
        Object.keys(pageFrame.frames).map((placeName) => {
            const childFrameId = pageFrame.frames[placeName];
            this.renderFrame(childFrameId, page);
            const childFrame = this.frames[childFrameId];
            if (frame.pageFrame.frames[placeName] !== pageFrame.frames[placeName]
                || !frame.children[placeName].getValue()) {
                frame.children[placeName].next(childFrame.component);
            }
        });
    }
    protected createFrame(pageFrame: IPageFrame) {
        const ViewClass = this.views[pageFrame.frameName];
        const data: { [index: string]: Subject<any> } = {};
        Object.keys(pageFrame.data).map((dataName) => {
            data[dataName] = new BehaviorSubject(pageFrame.data[dataName]);
        });
        const children: { [index: string]: BehaviorSubject<Component<any>> } = {};
        Object.keys(pageFrame.frames).map((childName) => {
            children[childName] = new BehaviorSubject(undefined as any);
        });
        const params = new BehaviorSubject(pageFrame.params);
        const component = new ViewClass({
            data,
            children,
            params,
            navigate: this.navigate,
            dispatch: (actionName: string, ...args: any[]) => this.dispatch({
                frameId: pageFrame.frameId,
                actionName,
                args,
            }),
        });
        return {
            pageFrame,
            component,
            data,
            children,
            params,
        };
    }
}
export default ClientPageRenderer;
