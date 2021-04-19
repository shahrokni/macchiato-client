export default function calculatePage(countCollection:number,requestedPage:number){
    let calculatedPageNumber = requestedPage;
    countCollection = (countCollection>100) ? 100 : countCollection;

    let countItemPerPage  = countCollection / 10;
    countItemPerPage = (countCollection%10 !== 0)? countItemPerPage+1 : countItemPerPage;
    countItemPerPage-=1;
    
    if(countItemPerPage <= 0)
        calculatedPageNumber = 0;
    else if(requestedPage > countItemPerPage)
        calculatedPageNumber = countItemPerPage;
    return calculatedPageNumber;
}