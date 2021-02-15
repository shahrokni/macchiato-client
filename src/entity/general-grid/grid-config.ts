export default interface IGridConfig {   
    id:string; 
    headerColour: string;
    headerCellColour: string
    headerTitles: ITitleWidth[];
    hasPaging: boolean;
    oddRowsColur: string;
    evenRowsColour: string;
    hasActions:boolean
}
export interface ITitleWidth{
    title:string;
    width:number;
}