import React, { useEffect,useState } from 'react';
import { View, Text,Dimensions } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Icon } from 'galio-framework';
import Dialog, { DialogContent,DialogButton } from 'react-native-popup-dialog';
import { Button } from 'galio-framework';
import { preventAutoHide } from 'expo-splash-screen';



const AccessContacts=({assignTo})=> {
    const [contacts,setContacts]= useState([]);
    const [visible,setVisible] =useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        console.log('contacts')
        if (data.length > 0) {
          var contact=[];

          for(let i=0;i<10;i++){
            contact.push(data[i]);
        }
        setContacts(contact);
        }
      }
    })();
  }, []);

  const handlePress=()=>{
    // console.log(contacts);
    setVisible(true);
    
  }
  const assignValue=(event)=>{
    assignTo(event);
    setVisible(false);
  }
  return (
    <View
     >
        <Icon style={{marginTop:9}} onPress={handlePress} name="contacts" family="material"  color='#89aeb2' size={40} />
        <Dialog  visible={visible}
        onTouchOutside={() =>{
        setVisible(false)}
        }>
        <DialogContent style={{
          width:(Dimensions.get('window').width)/1.2,
          marginRight:8
        }}>
            {
                contacts.map(item=>{ return <View>
                  <Button 
                    onPress={()=>assignValue(item.firstName)}
                    style={{
                    width:'100%',
                    }} color="#50C7C7" shadowless>{item.firstName}</Button></View>
                }) 
            }
        </DialogContent>
        </Dialog>
    </View>
  );
}

export default AccessContacts;
