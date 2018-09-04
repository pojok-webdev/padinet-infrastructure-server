var 
getnodes = () => {
    sql = 'select * from nodes '
    return sql
}
getEdges = () => {
    sql = 'select * from links '
    return sql
}
saveNode = obj => {
    sql = 'insert into nodes '
    sql+= '(id,nodetype,location,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.id+'","'+obj.nodetype+'","'+obj.location+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("SQL",sql)
    return sql
}
saveEdge = obj => {
    sql = 'insert into links '
    sql+= '(name,linktype,source,target,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'+obj.linktype+'","'+obj.source+'","'+obj.target+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("saveEdge query",sql)
    return sql
}
updateEdge = obj => {
    sql = 'update links '
    sql+= 'set name="'+obj.name+'",linktype="'+obj.linktype+'",source="'+obj.source+'",target="'+obj.target+'",description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateEdge query",sql)
    return sql
}
updateNode = obj => {
    sql = 'update nodes '
    sql+= 'set id="'+obj.id+'",nodetype="'+obj.nodetype+'",location="'+obj.location+'",description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'mysqlid="'+obj.mysqlid+'" '
    console.log("updateEdge query",sql)
    return sql
}
removeNode = obj => {
    sql = 'delete from nodes '
    sql+= 'where mysqlid='+obj.mysqlid+' '
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
