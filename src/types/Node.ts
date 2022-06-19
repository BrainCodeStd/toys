export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  data: Data[];
  error:string;
}
interface Attributes{
index: number,
timestamp: bigint,
data: string,
"previous-hash": string,
hash: string

}
export interface Data{
  id : string,
  type : string,
  attributes : Attributes
}
export interface Open{
  name:string,
  status: boolean 
}
