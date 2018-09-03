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
    sql+= '(name,nodetype,location,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'+obj.nodetype+'","'+obj.location+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("SQL",sql)
    return sql
}
saveEdge = obj => {
    sql = 'insert into links '
    sql+= '(name,linktype,src,tgt,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'+obj.linktype+'","'+obj.src+'","'+obj.tgt+'","'+obj.description+'","'+obj.createuser+'")'
    console.log("saveEdge query",sql)
    return sql
}

module.exports = {
    getnodes : getnodes,
    saveNode : saveNode,
    getEdges : getEdges,
    saveEdge : saveEdge
};
