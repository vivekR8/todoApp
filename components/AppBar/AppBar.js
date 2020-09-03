import React from 'react';
import { StyleSheet,Button,Text, TextInput, View, Dimensions,Platform } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { setNewTask } from '../../redux/task/task.action';
import DateTimePicker from '@react-native-community/datetimepicker';




class AppBar extends React.Component{
    constructor(){
        super();
        this.state={
            visible:false,
            title:'',
            description:'',
            from:new Date(),
            show:false,
            to:new Date(),
            mode:''
        }
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        this.setState({show:Platform.OS === 'ios'});
        if(this.state.mode==='date1'){
        this.setState({from:currentDate});
        }
        else{
            this.setState({to:currentDate});
        }
      };

    
    
    showDatepicker1 = () => {
        this.setState({mode:'date1'})
        this.setState({show:true});
      };
    showDatepicker2 = () => {
        this.setState({mode:'date2'})
        this.setState({show:true});
      };
    handleChange=(event)=>{
        
        const {name,value}=event.target;
        this.setState({[name]:value})
    }
    handleSubmit=(event,props)=>{
        event.preventDefault()
        const {title,description,status,from,to}=this.state
        // console.log('todo.....',props.todo)
        let todoList=[...this.props.todo];
        let task={};
        task['title']=title;
        task['description']=description;
        task['to']=to;
        task['from']=from;
        todoList.push(task)
        this.props.setTask(todoList);
        console.log('handle submmit',todoList);
        this.setState({visible:false})
    }
    render(){
        const {title,description,from,to,show}=this.state
    return(
        <View style={styles.header}>
            <View>
                <Text style={styles.text}>Your TODO LIST</Text>
            </View>
            <View>
                <Button style={{borderRadius:50}}
                    title="Create a Task "
                    color="#ff7e7a"
                    onPress={() => {
                    this.setState({ visible: true });
                    }}
                />
            </View>
            <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                this.setState({ visible: false });
                }}
                >
                <DialogContent style={styles.dialog}>
                    <Formik
                    //initialValues={{ email: '' }}
                    onSubmit={values => console.log(values)}
                    >
                    {() => (
                    <View >
                    <Text>Enter your New Todo</Text>
                    <TextInput style={styles.textInput}
                    name='title'
                    placeholder="Title"
                    onChangeText={(title)=>{this.setState({title})}}
                    //onBlur={handleBlur('email')}
                    editable
                    value={title}
                    />
                    <TextInput style={styles.textInput}
                    name='description'
                    placeholder="Description"
                    multiline={true}
                    onChangeText={(description)=>{this.setState({description})}}
                    //onBlur={handleBlur('email')}
                    editable
                    value={description}
                    />
                    <View style={styles.buttonN}>
                        <Button onPress={this.showDatepicker1} title="Start Date" />
                    </View>
                    <View style={styles.buttonN}>
                        <Button  onPress={this.showDatepicker2} title="End Date" />
                    </View>
                    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={from}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
                    <Button type='submit'onPress={this.handleSubmit} title="Submit" />
                    </View>
                    )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </View>
    );
    }
}
const mapStateToProps = ({todoList})=>({
    todo:todoList.task
})
const mapDispatchToProps=dispatch=>({
    setTask:newTask=> dispatch(setNewTask(newTask))
})

export default connect(mapStateToProps,mapDispatchToProps)(AppBar);

const styles=StyleSheet.create({
    header:{
        display:"flex",
        flexDirection:"row",
        padding:10,
        borderBottomWidth:2,
        borderBottomColor:'#ffffff',
        paddingLeft:8,
        paddingRight:8,
        justifyContent:"space-between",
        backgroundColor:'#c6e0ff',
    },
    text:{
        fontSize:25,
    },
    dialog:{
        width:(Dimensions.get('window').width)/1.2,
        padding:20,
        justifyContent:"space-evenly",
        
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:'#2e3131',
        marginBottom:15,
        height:60,
    },
    buttonN:{
        borderRadius:100,
        marginBottom:10,
        backgroundColor:'#fff'
    }
})