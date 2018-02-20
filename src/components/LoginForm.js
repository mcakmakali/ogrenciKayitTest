import React, { Component } from 'react';
import { Text, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { emailChanged, passwordChanged } from '../actions';
import { Button, Card, CardSection, Spinner } from './index';


class LoginForm extends Component  {
    state = { email: '', password: '', loading: false};

    clicklogin(){
      this.setState({ loading: true});
      const { email, password } = this.state;

      if(email === '' || password === ''){
        this.setState({ 'loading': false });
        Alert.alert(
          'Mesaj',
          'Lütfen tüm alanları doldurunuz!',
          [
            { text : 'Tamam', onPress:() => null }
          ]
        );
      }else{

        firebase.auth().signInWithEmailAndPassword(email, password) // Kullanıcı kaydı
        .then(this.loginSucces.bind(this)) // eğer olumlu ise yönlendir
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password) // yeni kullanıcı kaydı
          .then(this.loginSucces.bind(this))
          .catch(this.loginFail.bind(this));
        }) // hata varsa
      }
    }
    // kullanıcı girişi başarılı ise
    loginSucces(){
      console.log("başarılı");
      this.setState({ 'loading': false });
    }
    // kullanıcı girişinde hata varsa
    loginFail(){
      this.setState({ 'loading': false });
      Alert.alert(
        'Mesaj',
        'Kullanıcı adı veya şifreniz hatalı!',
        [
          { text : 'Tamam', onPress:() => null }
        ]
      );
    }

    renderButton(){
      if(!this.state.loading){
        return <Button onPress={ this.clicklogin.bind(this)}>GİRİŞ YAP</Button>;
      }
      return <Spinner size='small' />;
    }

    render(){
      console.log("Email " + this.props.email);
      console.log("Pass " + this.props.password);
      const {inputStyle} = styles;
      return(
        <Card>
          <CardSection>
            <TextInput
              placeholder = "E-mail adresi"
              style = {inputStyle}
              value={this.props.email}
              onChangeText={ email => this.props.emailChanged(email) }
            />
          </CardSection>
          <CardSection>
          <TextInput
            secureTextEntry
            placeholder = "Şifreniz"
            value={this.props.password}
            style = {inputStyle}
            onChangeText={ password => this.props.passwordChanged(password) }
          />
          </CardSection>
          <CardSection>
              {this.renderButton()}
          </CardSection>
        </Card>
      );
    };

}

const styles = {

  inputStyle: {
    color:'#000',
    padding:10,
    fontSize:18,
    lineHeight:23,
    flex:2

  }
}

const mapStateToProps = ({ kimlikdogrulamaResponse }) => {
  const { email, password } = kimlikdogrulamaResponse;


  return {
    email,
    password
  }
};


export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginForm);
