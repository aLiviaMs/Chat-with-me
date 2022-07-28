import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import FIre from '../FIre';

interface Props {
    navigation: any
}

export default class ChatScreen extends React.Component<Props> {
    state = {
        messages: []
    }

    get user() {
        return {
            _id: FIre.uid,
            name: this.props.navigation.state.params.name
        }
    }

    componentDidMount() {
        FIre.get((message: any) => 
            this.setState((previous:any) => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    }

    componentWillUnmount() {
        FIre.off();
    }

    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={FIre.send} user={this.user} />
        
        if(Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            )
        }

        return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>
    }
}

// const styles = StyleSheet.create({
//    container: {
//        flex: 1,
//        justifyContent: 'center',
//        alignItems: 'center'
//    }
// })