

function makeEdgesNextToeachOther(arr){
    let edges = getEdges(arr);
    let sortedEdges = placeNextToEachOther(edges);
    return sortedEdges;
}


function getEdges(arr){

    let edges = [];
    for(let i = 0; i < arr[0].length; i++){
        let nodes = (arr[0][i]).getPostion();

        let edge1 = [nodes[0], nodes[1], nodes[2], nodes[3], arr[0][i]]
        let edge2 = [nodes[2], nodes[3], nodes[4], nodes[5], arr[0][i]]
        let edge3 = [nodes[4], nodes[5], nodes[0], nodes[1], arr[0][i]]

        edges.push(sortEdge(edge1));
        edges.push(sortEdge(edge2));
        edges.push(sortEdge(edge3));
    }
    return edges;
}


function sortEdge(edge){
    let newEdge = [];
    // Sort the edge to (Xmin, Xmax, Ymin, Ymax, ptr)
    if(edge[0] < edge[2]){
        newEdge.push(edge[0]);
        newEdge.push(edge[2]);
    }else{
        newEdge.push(edge[2]);
        newEdge.push(edge[0]);
    }

    if(edge[1] < edge[3]){
        newEdge.push(edge[1]);
        newEdge.push(edge[3]);
    }else{
        newEdge.push(edge[3]);
        newEdge.push(edge[1]);
    }

    newEdge.push(edge[4]);
    return newEdge;
}

function placeNextToEachOther(arr){
    let sortedTriangles = [];
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if((arr[i][0]) == (arr[j][0]) && (arr[i][1]) == (arr[j][1]) && (arr[i][2]) == (arr[j][2]) && (arr[i][3]) == (arr[j][3])){
                sortedTriangles.push(arr[i]);
                sortedTriangles.push(arr[j]);
                arr.splice(i, 1);
                arr.splice(j-1, 1);
                i--;
                break;
            }
        }

    }
    return sortedTriangles;
}