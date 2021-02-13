import filterFieldExpression from "../general-grid/filter-field-expression";
import IFilter from "../general-grid/IFilter";

export default class UserMessageFilter implements IFilter {   
    fieldsExpression: filterFieldExpression[] | undefined;
    pageNumber: number | undefined;
}