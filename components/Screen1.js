import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ScrollView } from 'react-native';
import {View,Button,Image,TextInput, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable} from 'react-native'
import { FlatList } from 'react-native-web';



function Screen1(){
    const [data,setData] = useState([]);
    const [error,setError]= useState(null);

    const [searchDonut, setSearchDonut] = useState('');
    const [dataSearchDonut, setDataSearchDonut] = useState(data);


    const ApiDATA = async()=>{
        try{
         const response= await fetch('https://654859cbdd8ebcd4ab22c461.mockapi.io/week8_cake');
         if(!response.ok){
           throw new Error('Loi khi nhap lieu tu API');
         }
    const data = await response.json();
    setData(data);
       }catch(err){
         setError(err);
       }
      };
       useEffect(()=>{
     ApiDATA();
       },[]);

    useEffect(() => {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchDonut.toLowerCase()));
        setDataSearchDonut(filteredData);
    }, [searchDonut, data]);

    const [selectedTad, setSelectedTab] = useState('Donut');
    const handleSelectedTab = (tabName) => {
        setSelectedTab(tabName);
        setSearchDonut(tabName);
    }
    
    const renderItem =({item})=>(
       <View style={{width:'100%', height:120,flexDirection:'row',backgroundColor:'white'}}>
            <Pressable style={{width:'100%',justifyContent:'center',alignItems:'flex-start',flexDirection:'row',backgroundColor:'#F4DDDD',margin:5,borderRadius:10}}>
                <View style={{justifyContent:'center',alignItems:'center',paddingTop:5,}}>
                    <Image source={{uri: item.img}} style={{width: 111, height: 101}}></Image>
                </View>
                <View style={{justifyContent:'center',width:200,gap:10,margin:5}}>
                    <Text style={{fontWeight:'bold', margin:5}}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text style={{fontWeight:'bold', margin:5}}>${item.price}</Text>
                </View>
               

            </Pressable>

       </View>
        
    )
    return(
        <View style={{flex:1,margin:'10px'}}>
            <ScrollView>
                <View  style={{backgroundColor:'white',height:200, padding: 10}}>
                    <Text style={{color:'gray'}}>Welcome,Jala</Text>
                    <Text style={{fontWeight:'bold',fontSize:20}}>Choice Your Best Food</Text>
                    <TextInput placeholder='Search food' style={{width:300, height:40,borderWidth:1,marginTop:40,borderRadius:10}} onChangeText={Text=>setSearchDonut(Text)}></TextInput>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', paddingBottom: 30}}>
                  <TouchableOpacity onPress={()=>handleSelectedTab('Donut')}   style={{borderRadius:5, borderWidth:1,width:80, height:40,margin:5}}><Text style={{padding:8}} >Donuts</Text></TouchableOpacity>
                  
                  <TouchableOpacity onPress={()=>{handleSelectedTab('Pink Donut')}}  
                  style={{borderRadius:5, borderWidth:1,width:95, height:40,margin:5}}><Text style={{padding:8}}>Pink Donut</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>{handleSelectedTab('Floating Donut')}} 
                  
                  style={{borderRadius:5, borderWidth:1,width:80, height:40,margin:5}}><Text style={{padding:8}}>Floating</Text></TouchableOpacity>
                </View>


            <FlatList data={dataSearchDonut} renderItem={renderItem} keyExtractor ={item => item.id}>

            </FlatList>







            </ScrollView>
        
       </View>
       
        
      
        
        
    )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundcolor:'while',
        height:200
    }
    
    
})

export default Screen1;