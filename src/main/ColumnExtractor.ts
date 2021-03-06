import Column from "./Column";

export default class ColumnExtractor {
  private columnObject: any = {};
  private columns: Column[] = [];

  constructor(object: any) {
    this.getColumnsFor(object);
    this.makeColumnsFromColumnObject();
  }

  public getColumns(): Column[] {
    return this.columns;
  }

  private makeColumnsFromColumnObject() {
    Object.keys(this.columnObject).forEach(key =>
      this.columns.push(new Column(key, this.columnObject[key]))
    );
  }

  private getColumnsFor(object: any) {
    const objectFieldKey = this.getObjectFieldKey(object);
    Object.keys(object).forEach(key => this.handleObjectKeys(key, objectFieldKey, object));
  }

  private handleObjectKeys(key: string, objectFieldKey: string | undefined, object: any) {
    if (key !== objectFieldKey) this.addToColumnsForNonObjectFields(key, object);
    else object[objectFieldKey].forEach((obj: any) => this.getColumnsFor(obj));
  }

  private addToColumnsForNonObjectFields(key: string, object: any) {
    if (!this.columnObject[key]) this.columnObject[key] = [];
    this.columnObject[key].push(object[key].toString());
    if (!this.getObjectFieldKey(object)) return;
    const numberOfNulls = this.numberOfChildObjects(object);
    for (let i = 1; i < numberOfNulls; i++) this.columnObject[key].push("");
  }

  private numberOfChildObjects(object: any): number {
    let objectFieldKey = this.getObjectFieldKey(object);
    let depth = 1;
    while (objectFieldKey) {
      depth *= object[objectFieldKey].length;
      object = object[objectFieldKey][0];
      objectFieldKey = this.getObjectFieldKey(object);
    }
    return depth;
  }

  private getObjectFieldKey(object: any): string | undefined {
    return Object.keys(object).find((key: any) => typeof object[key] === "object");
  }
}
