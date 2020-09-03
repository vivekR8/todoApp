import React,{ useState } from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import { theme, withGalio, GalioProvider } from 'galio-framework'
import { Accordion, Block } from 'galio-framework';
import { Icon } from 'galio-framework';



import { Card } from 'galio-framework';
import { Button } from 'galio-framework';



const customTheme = {
    SIZES: { BASE: 18, } ,
    // this will overwrite the Galio SIZES BASE value 16
    COLORS: { PRIMARY: 'red', } 
    // this will overwrite the Galio COLORS PRIMARY color #B23AFC
  };



const TaskCard =({cardItem,key})=>{
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
    const d= new Date();
      const date= d.getDay();
      console.log('date',date,'aefe',cardItem.from.getDay(),'sa',cardItem.to.getDay())

    return(
        
        <View >
        
        {(removedItems.includes(key))? (<Text>ITEM REMOVED</Text>):(
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:4}}>
        <Block style={{ height: (isShow)?(200):(60),paddingBottom:4, }}>
            <Accordion
            
            style={(cardItem.from.getDay() <= date && cardItem.to.getDay() >= date)?
                {width:(Dimensions.get('window').width)/1.15,
             backgroundColor:'#15ff95'
            }:
            ((cardItem.from.getDay() > date)?
            {width:(Dimensions.get('window').width)/1.15,
             backgroundColor:'#157fff'
            }
            :{width:(Dimensions.get('window').width)/1.15,
             backgroundColor:'#abb7b2'
            }
            )}
                onAccordionOpen={()=>{setShow(true)}}
                onAccordionClose= {()=>{setShow(false)}}
                dataArray={data} >

                </Accordion>



        </Block>
        <Icon style={{marginTop:9}} onPress={handlePress} name="delete-forever" family="material"  color='#89aeb2' size={40} />
        </View>)}
        </View>

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