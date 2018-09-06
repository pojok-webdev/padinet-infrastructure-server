var 
getnodes = () => {
    sql = 'select * from nodes '
    console.log("GetNodes",sql)
    return sql
}
getEdges = obj => {
    console.log("OBJ",obj)
    if(obj.node_id == 'null'){
        sql = 'select * from links '
    }else{
        sql = 'select * from links where source="'+obj.node_id+'" or target="'+obj.node_id+'" '
    }
    console.log("getEdges",sql)
    return sql
}
saveNode = obj => {
    sql = 'insert into nodes '
    sql+= '(id,nodetype,address,city,location,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.id+'","'+obj.nodetype+'","'+obj.address+'","'+obj.city+'","'+obj.location+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("SQL",sql)
    return sql
}
saveEdge = obj => {
    sql = 'insert into links '
    sql+= '(name,linktype,source,target,capacity,vendor,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'+obj.linktype+'","'+obj.source+'","'+obj.target+'","'+obj.capacity+'","'+obj.vendor+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("saveEdge query",sql)
    return sql
}
updateEdge = obj => {
    sql = 'update links '
    sql+= 'set name="'+obj.name+'",linktype="'+obj.linktype+'",source="'+obj.source+'",target="'+obj.target+'",capacity="'+obj.capacity+'",vendor="'+obj.vendor+'",description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateEdge query",sql)
    return sql
}
updateNode = obj => {
    sql = 'update nodes '
    sql+= 'set id="'+obj.id+'",nodetype="'+obj.nodetype+'",address="'+obj.address+'",city="'+obj.city+'",location="'+obj.location+'",description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateNode query",sql)
    return sql
}
removeNode = obj => {
    sql = 'delete a,b from nodes a '
    sql+= 'left outer join links b on b.source=a.id '
    sql+= 'left outer join links c on c.target=a.id '
    sql+= 'where id='+obj.id+' '
    console.log("remove node Query : ",sql)
    return sql
}
removeEdge = obj => {
    sql = 'delete from links '
    sql+= 'where id='+obj.id+' '
    console.log("remove edge Query : ",sql)
    return sql
}
module.exports = {
    getnodes : getnodes,
    saveNode : saveNode,
    getEdges : getEdges,
    saveEdge : saveEdge,
    updateEdge : updateEdge,
    updateNode : updateNode,
    removeNode : removeNode,
    removeEdge : removeEdge
};
