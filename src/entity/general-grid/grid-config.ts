export default interface IGridConfig {   
    id:string; 
    headerColour: string;
    headerCellColor: string;
    headerTitleWidthPair: ITitleWidthPair[];
    hasActions:boolean;
}
export interface ITitleWidthPair{
    title:string;
    dataKey:string
    width:number;
}