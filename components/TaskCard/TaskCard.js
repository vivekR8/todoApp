import React,{ useState } from 'react';
import { StyleSheet, Text, View,Dimensions,ScrollView } from 'react-native';
import { theme, withGalio, GalioProvider } from 'galio-framework'
import { Accordion, Block } from 'galio-framework';
import { Icon } from 'galio-framework';
import AccessContacts from '../AccessContacts/accessContacts';



import { Card } from 'galio-framework';
import { Button } from 'galio-framework';



const customTheme = {
    SIZES: { BASE: 18, } ,
    // this will overwrite the Galio SIZES BASE value 16
    COLORS: { PRIMARY: 'red', } 
    // this will overwrite the Galio COLORS PRIMARY color #B23AFC
  };



const TaskCard =({cardItem,key})=>{
    const [assignedTo,setAssignedTo]=useState('');
    console.log('card',cardItem);
    const [isShow, setShow] = useState(false);
    const [removedItems,setRemovedItems] = useState([]);
    const data = [
        { title: `${cardItem.title}`, content: `${cardItem.description}`, 
        
          icon: {
            name: 'delete-forever',
            family: 'material',
            size:1,
          } 
       }]
    const handlePress = () => {
        const remove=[];
        remove.push(key);
        setRemovedItems(remove);
        console.info('You clicked the delete icon.');
    };
    const assignTo=(value)=>{
        console.log('assignedto',value)
        setAssignedTo(value);
    }
    const d= new Date();
      const date= d.getDay();
      console.log('date',date,'aefe',cardItem.from.getDay(),'sa',cardItem.to.getDay())

    return(
        
        <ScrollView >
        
        {(removedItems.includes(key))? (<Text>ITEM REMOVED</Text>):(
            <View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:4}}>
            
        <Block style={{ height: (isShow)?(200):(60),paddingBottom:4, }}>
            <Accordion
            
            style={(cardItem.from.getDay() <= date && cardItem.to.getDay() >= date)?
                {width:(Dimensions.get('window').width)/1.25,
             backgroundColor:'#15ff95'
            }:
            ((cardItem.from.getDay() > date)?
            {width:(Dimensions.get('window').width)/1.25,
             backgroundColor:'#157fff'
            }
            :{width:(Dimensions.get('window').width)/1.25,
             backgroundColor:'#abb7b2'
            }
            )}
                onAccordionOpen={()=>{setShow(true)}}
                onAccordionClose= {()=>{setShow(false)}}
                dataArray={data} >

                </Accordion>


        </Block>
        <AccessContacts assignTo={assignTo}/>
        <Icon style={{marginTop:5}} onPress={handlePress} name="delete-forever" family="material"  color='#89aeb2' size={45} />
        </View>
        {(assignedTo !=='')?(<Text style={{
            marginTop:-15,
            marginLeft:10,
            paddingLeft:10,
            borderBottomWidth:10,
            borderBottomColor:'#ebe9e9',
            backgroundColor:'#b28dff',
            width:(Dimensions.get('window').width)/1.3,
            borderRadius:50
            }}>
        
            Assigned To = {assignedTo}</Text>):(null)}
        </View>)}
        
        </ScrollView>

    );
}

export default TaskCard;

const styles=StyleSheet.create({
    content:{
        flex:1,
        width:Dimensions.get('window').width,
        backgroundColor:'#97f2f3',
        color:'#97f2f3',
    }
})