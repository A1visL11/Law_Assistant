import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatbaseComponent from "./mainPage";
import CustomDrawerContent from "../Components/Drawer";
import { Ionicons } from "@expo/vector-icons";
import { Button, Dimensions, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
// import { chatRoomName } from "../chatbase/chatRoomId";
import { useEffect, useState } from "react";
import CustomButton from "../Components/Button";
import { colorList } from "../Components/colorList";
import { getRoomTitle } from "../chatbase/chatFirebase";
import useAuth from "../hooks/useAuth";
import * as Haptics from 'expo-haptics';


const Sidebar=createDrawerNavigator();
const screen= Dimensions.get('window')


const SidebarNavigator=({navigation})=>
{
    // const [roomNames, setRoomNames]=useState(chatRoomName)
    const {user} = useAuth();
    const [newRoomName, setNewRoomName]=useState('New');
    const [num,setNum]=useState(0)
    const [rooms,setRooms]=useState([{roomName:'0',roomTitle:'New'}])
    const [title,setTitle]=useState('New')
    /* // This useEffect will run once on mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getRoomTitle(user);
                setRooms(prev => [...prev, ...history]); // Assuming history is an array of room objects
            } catch (error) {
                console.error('Error fetching room titles:', error);
            }
        };

        fetchHistory();
    }, [user]); // Add dependencies as needed
    */
    useEffect(() => {
        const fetchRoomTitle = async () => {
            try {
                console.log('Fetching room titles...');
                const roomsFromFirebase=(await getRoomTitle(user));
                setRooms(roomsFromFirebase)
                navigation.navigate(roomsFromFirebase[0].roomName)
            } catch (error) {
                console.error('Failed to fetch room title:', error);
            }
        };
        fetchRoomTitle();
    }, [user]);
    // useEffect(() => {
    //     console.log('Rooms updated:', rooms);
    // }, [rooms]);

    // if (!rooms) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }
    return (
        <Sidebar.Navigator 
            drawerContent={(props)=>CustomDrawerContent(props)}
            // screenOptions={{headerShown:false}} 
            screenOptions={{
                drawerActiveTintColor: '#f6f6f6',
                drawerInactiveTintColor:'#f6f6f6',
                // headerBackground:'black',
                headerTintColor: '#f6f6f6',
                headerStyle: {
                    backgroundColor: "#191919",
                    
                },
            }}
        >
            {rooms!==undefined&& 
            rooms.map((content,ind)=>{
                const name=content.roomName;
                const Title=content.roomTitle;
                const isNew=Boolean(ind===0)
                return(
                    <Sidebar.Screen
                        name={name}
                        key={ind}
                        options={()=>({title:isNew? title:Title})}
                        children={()=>
                            <ChatbaseComponent
                                rooms={rooms}
                                setRooms={setRooms}
                                setTitle={setTitle}
                                isNew={isNew}
                                name={name}
                            />
                        }
                    />
                )
            })

            }
        </Sidebar.Navigator>
    )
}


export default SidebarNavigator;

const styles = StyleSheet.create({
    rightButton:
    {
        alignItems:'flex-end',
        alignSelf:'flex-end',
        paddingRight:screen.width*0.03,
        // backgroundColor:'red'
    }
})