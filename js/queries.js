var 
getnodes = () => {
    sql = 'select * from nodes '
    console.log("GetNodes",sql)
    return sql
}
getEdges = obj => {
    console.log("OBJ",obj)
    if(obj.node_id == 'null'){
        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,a.source_ipaddr,a.target_ipaddr,a.utility,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '
/*        sql+= 'union '
        sql+= 'select concat("e",a.id)id,a.linktype,a.target,a.source,a.name,a.capacity,a.vendor,a.source_ipaddr,a.target_ipaddr,a.utility,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.target '
        sql+= 'left outer join nodes c on c.id=a.source '*/
    }else{
        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,a.source_ipaddr,a.target_ipaddr,a.utility,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '
        sql+= 'where a.source="'+obj.node_id+'" '
        sql+= 'union '
        sql+= 'select concat("e",a.id)id,a.linktype,a.target,a.source,a.name,a.capacity,a.vendor,a.source_ipaddr,a.target_ipaddr,a.utility,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.target '
        sql+= 'left outer join nodes c on c.id=a.source '
        sql+= 'where a.target="'+obj.node_id+'"'
    }
    console.log("getEdges",sql)
    return sql
}
saveNode = obj => {
    sql = 'insert into nodes '
    sql+= '(name,nodetype,class,address,city,location,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'
    sql+= obj.nodetype+'","'
    sql+= obj.class+'","'
    sql+= obj.address+'","'
    sql+= obj.city+'","'
    sql+= obj.location+'","'
    sql+= obj.description+'","'
    sql+= obj.createuser+'")'
    console.log("SQL",sql)
    return sql
}
saveEdge = obj => {
    sql = 'insert into links '
    sql+= '(name,linktype,source,source_ipaddr,target,target_ipaddr,capacity,vendor,utility,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.name+'","'
    sql+= obj.linktype+'","'
    sql+= obj.source+'","'
    sql+= obj.source_ipaddr+'","'
    sql+= obj.target+'","'
    sql+= obj.target_ipaddr+'","'
    sql+= obj.capacity+'","'
    sql+= obj.vendor+'","'
    sql+= obj.utility+'","'
    sql+= obj.description+'","'
    sql+= obj.createuser+'")'
    console.log("saveEdge query",sql)
    return sql
}
updateEdge = obj => {
    obj.id = (obj.id).substring(1,(obj.id).length)
    sql = 'update links '
    sql+= 'set name="'+obj.name+'",'
    sql+= 'linktype="'+obj.linktype+'",'
    sql+= 'source="'+obj.source+'",'
    sql+= 'source_ipaddr="'+obj.source_ipaddr+'",'
    sql+= 'target="'+obj.target+'",'
    sql+= 'target_ipaddr="'+obj.target_ipaddr+'",'
    sql+= 'capacity="'+obj.capacity+'",'
    sql+= 'vendor="'+obj.vendor+'",'
    sql+= 'utility="'+obj.utility+'",'
    sql+= 'description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateEdge query",sql)
    return sql
}
updateNode = obj => {
    sql = 'update nodes '
    sql+= 'set id="'+obj.id+'",'
    sql+= 'name="'+obj.name+'",'
    sql+= 'nodetype="'+obj.nodetype+'",'
    sql+= 'address="'+obj.address+'",'
    sql+= 'city="'+obj.city+'",'
    sql+= 'location="'+obj.location+'",'
    sql+= 'description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateNode query",sql)
    return sql
}
removeNode = obj => {
    sql = 'delete a,b from nodes a '
    sql+= 'left outer join links b on b.source=a.id '
    sql+= 'left outer join links c on c.target=a.id '
    sql+= 'where a.id='+obj.id+' '
    console.log("remove node Query : ",sql)
    return sql
}
removeEdge = obj => {
    obj.id = (obj.id).substring(1,(obj.id).length)
    sql = 'delete from links '
    sql+= 'where id='+obj.id+' '
    console.log("remove edge Query : ",sql)
    return sql
}
getneighbours = obj => {
    sql = 'select c.name,c.address,c.city,b.capacity,b.vendor,b.name lnk from nodes a '
    sql+= 'left outer join links b on b.source=a.id '
    sql+= 'left outer join nodes c on c.id=b.target '
    sql+= 'where a.id='+obj.id+' ' 
    sql+= 'and b.target is not null '
    sql+= 'union '
    sql+= 'select c.name,c.address,c.city,b.capacity,b.vendor,b.name lnk from nodes a '
    sql+= 'left outer join links b on b.target=a.id '
    sql+= 'left outer join nodes c on c.id=b.source '
    sql+= 'where a.id='+obj.id+' ' 
    sql+= 'and b.source is not null '
    console.log("Getneighbours sql",sql)
    return sql
}
getLinkTypes = () => {
    sql = 'select * from linktypes '
    return sql
}
getVendors = () => {
    sql = 'select * from vendors '
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
    removeEdge : removeEdge,
    getneighbours : getneighbours,
    getLinkTypes : getLinkTypes,
    getVendors : getVendors
};
