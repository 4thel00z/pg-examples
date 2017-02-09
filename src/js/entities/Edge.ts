import {Vertex} from "./Vertex";
export class Edge {

    private _from: Vertex;
    private _to: Vertex;
    private _cost: number;

    constructor(from: Vertex, to: Vertex, cost: number) {
        this._from = from;
        this._to = to;
        this._cost = cost;
    }

    get to(): Vertex {
        return this._to;
    }

    set to(value: Vertex) {
        this._to = value;
    }

    get from(): Vertex {
        return this._from;
    }

    set from(value: Vertex) {
        this._from = value;
    }

    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }

    public save(client, done) {

        client.query('INSERT INTO public."Edges" VALUES ($1,$2,$3);', [this.from.id, this.to.id, this.cost], function (err, result) {

            if (done) done();

            if (err) {
                return console.error('error running query', err);
            }
            console.log(result.rows);
        })
    }

}