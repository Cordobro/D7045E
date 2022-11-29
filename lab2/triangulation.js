
class Tritri {
    constructor(p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
        this.postion = [p1_x, p1_y, p2_x, p2_y, p3_x, p3_y];
        this.friends = [];
        this.colar = "";
    }

    getPostion(){
        return this.postion;
    }

    getEdges(){
        return this.edges;
    }

    addFriends(triangle){
        this.friends.push(triangle);
    }

    getFriends(){
        return this.friends;
    }

    setColar(choosenColar){
        this.colar = choosenColar;
    }

    getColar(){
        return this.colar;
    }


}

function fixEdgesToList(arr){
    let temp = [];

    for(let i = 0; i < arr.length; i = i+6){
        for (let j = 0; j < 6; j = j+2) {
            let edge = arr[i, i+1, i+2, i+3];
            temp.push(edge);
        }
        
    }
    return temp;
}


function createTriangleData(points) {

    let upperHull = [];
    let lowerHull = [];

    if(isLeft(points[0], points[1], points[4], points[5], points[2], points[3])){
        upperHull = upperHull.concat(points[0], points[1], points[2], points[3], points[4], points[5]);
        lowerHull = lowerHull.concat(points[0], points[1], points[4], points[5]);   
    }else{
        upperHull = upperHull.concat(points[0], points[1],  points[4], points[5]) ;
        lowerHull = lowerHull.concat(points[0], points[1], points[2], points[3], points[4], points[5]);
    }
    
    let ListOfTri = [];
    let triangel = new Tritri(points[0], points[1], points[2], points[3], points[4], points[5]);
    ListOfTri.push(triangel);

    for (let k = 6; k < points.length; k = k+2) {
        
        let x = points[k];
        let y = points[k+1];
        
        //ta värdet av nya punkten, jämför med senaste satta punkten (med i båda listorna), Kolla sedan
        // om något värde över senaste satta punkten är med i upper hull 
        // if ja
        // ta bort näst sista punkten från upper hull och kolla vidare om inget mer värdet finns för upper hull
        // kolla då lowerhull


        // Kollar upperHull
        for(let i = upperHull.length-1; i > 0; i = i -2 ){
            if (isRight(x, y, upperHull[upperHull.length-2], upperHull[upperHull.length-1], upperHull[upperHull.length-4], upperHull[upperHull.length-3]) && upperHull.length >= 4){

                // ta bort senaste satta värdet och pusha nya
                let triangel = new Tritri(x, y, upperHull[upperHull.length-2], upperHull[upperHull.length-1], upperHull[upperHull.length-4], upperHull[upperHull.length-3]);
                ListOfTri.push(triangel);

                upperHull.pop();
                upperHull.pop();
            }else{
                upperHull.push(x);
                upperHull.push(y);
                break;
            }
        }        


        // Kollar lowerHull
        for(let i = lowerHull.length-1; i > 0; i = i -2 ){
            
            if (isLeft(x, y, lowerHull[lowerHull.length-2], lowerHull[lowerHull.length-1], lowerHull[lowerHull.length-4], lowerHull[lowerHull.length-3]) && lowerHull.length >= 4) {

                let triangel = new Tritri(x, y, lowerHull[lowerHull.length-2], lowerHull[lowerHull.length-1], lowerHull[lowerHull.length-4], lowerHull[lowerHull.length-3]);
                ListOfTri.push(triangel);

                lowerHull.pop();
                lowerHull.pop();
            }else{
                lowerHull.push(x);
                lowerHull.push(y);
                break;
            }
        }    
    } 
    //return triangel;
    return ListOfTri;
}


function isLeft(x0, y0, x1, y1, x2, y2){
    let value = ((x1 - x0)*(y2 - y0) - (x2 - x0)*(y1 - y0));
        if(value > 0)
            return false;
        else (value <= 0)
            return true;
    }


function isRight(x0, y0, x1, y1, x2, y2){
    let value = ((x1 - x0)*(y2 - y0) - (x2 - x0)*(y1 - y0));
        if(value >= 0)
            return true;
        else(value < 0)
            return false;
}