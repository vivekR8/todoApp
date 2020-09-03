import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import {connect} from 'react-redux';
import TaskCard from  '../TaskCard/TaskCard';
import AppBar from '../AppBar/AppBar';

const TaskBar=({todo})=>{
    todo.map(item=>console.log('todo',item.title))
    return(
    <View style={styles.content}>
        
        <AppBar style={styles.appBar}/>
        <View style={styles.topBar}>
        <Text style={{backgroundColor:'#157fff',width:(Dimensions.get('window').width)/3,borderRadius:10,paddingLeft:10}}>To Start</Text>
        <Text style={{backgroundColor:'#15ff95',width:(Dimensions.get('window').width)/3,borderRadius:10,paddingLeft:10}}>In Progress</Text>
        <Text style={{backgroundColor:'#abb7b2',width:(Dimensions.get('window').width)/3,borderRadius:10,paddingLeft:10}}>Finished</Text>
        </View>
        {(todo.length>0)?(
            todo.map((item,i)=><View><TaskCard cardItem={item} key={i}></TaskCard></View>
            )
            //<Text>here are the tasks</Text>
            
        ):(<Text>No Todos Right Now....Create One</Text>)
        }
    </View>
    );
}
const mapStateToProps=({todoList})=>({
    todo:todoList.task
})

export default connect(mapStateToProps)(TaskBar);

const styles=StyleSheet.create({
    content:{
        flex:1,
        height:100,
        //backgroundColor:'#f1a9a0',
        width:Dimensions.get('window').width,
    },
    appBar:{
        //flex:1,
        flexDirection:"row",
        height:20,
        //width:Dimensions.get('window').width,
    },
    taskCard:{
        height:80,
        marginTop:100,
        backgroundColor:'#9a12b3',
    },
    topBar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        textAlign:"center",
        margin:4,

    }
});