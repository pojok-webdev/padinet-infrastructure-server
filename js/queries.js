var 
getnodes = () => {
    sql = 'select * from nodes '
    console.log("GetNodes",sql)
    return sql
}
getEdges = obj => {
    console.log("OBJ",obj)
    if(obj.node_id == 'null'){
        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,a.description,b.name hsource,c.name htarget from links a '
        sql+= 'left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '

        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '
        sql+= 'union '
        sql+= 'select concat("e",a.id)id,a.linktype,a.target,a.source,a.name,a.capacity,a.vendor,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.target '
        sql+= 'left outer join nodes c on c.id=a.source '


    }else{
        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,a.description,b.name hsource,c.name htarget from links a '
        sql+= 'left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '
        sql+= 'where a.source="'+obj.node_id+'" or a.target="'+obj.node_id+'" '


        sql = 'select concat("e",a.id)id,a.linktype,a.source,a.target,a.name,a.capacity,a.vendor,'
        sql+= 'a.description,b.name hsource,b.address saddress,b.city scity,c.name htarget,c.address taddress,c.city tcity '
        sql+= 'from links a left outer join nodes b on b.id=a.source '
        sql+= 'left outer join nodes c on c.id=a.target '
        sql+= 'where a.source="'+obj.node_id+'" '
        sql+= 'union '
        sql+= 'select concat("e",a.id)id,a.linktype,a.target,a.source,a.name,a.capacity,a.vendor,'
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
    sql+= '(id,name,nodetype,address,city,location,description,createuser) '
    sql+= 'values '
    sql+= '("'+obj.id+'","'+obj.name+'","'+obj.nodetype+'","'+obj.address+'","'+obj.city+'","'+obj.location+'","'+obj.description+'","'+obj.createuser+'")'
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
    obj.id = (obj.id).substring(1,(obj.id).length)
    sql = 'update links '
    sql+= 'set name="'+obj.name+'",linktype="'+obj.linktype+'",source="'+obj.source+'",target="'+obj.target+'",capacity="'+obj.capacity+'",vendor="'+obj.vendor+'",description="'+obj.description+'" '
    sql+= 'where '
    sql+= 'id="'+obj.id+'" '
    console.log("updateEdge query",sql)
    return sql
}
updateNode = obj => {
    sql = 'update nodes '
    sql+= 'set id="'+obj.id+'",name="'+obj.name+'",nodetype="'+obj.nodetype+'",address="'+obj.address+'",city="'+obj.city+'",location="'+obj.location+'",description="'+obj.description+'" '
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
module.exports = {
    getnodes : getnodes,
    saveNode : saveNode,
    getEdges : getEdges,
    saveEdge : saveEdge,
    updateEdge : updateEdge,
    updateNode : updateNode,
    removeNode : removeNode,
    removeEdge : removeEdge,
    getneighbours : getneighbours
};
