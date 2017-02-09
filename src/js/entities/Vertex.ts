import {Edge} from "./Edge";
export class Vertex {

    private _id: number;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    public to(vertex: Vertex, cost: number): Edge {

        return new Edge(this, vertex, cost);
    }
}