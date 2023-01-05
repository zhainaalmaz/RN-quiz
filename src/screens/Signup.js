import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useLoginUserMutation, useSignupUserMutation} from '../redux/user.api';
import * as yup from 'yup';
import {Field, Formik} from 'formik';
import CustomInput from '../components/CustomInput';
import {isAuth} from '../redux/userSlice';

const backImage = require('../assets/background.jpg');

export const Signup = () => {
  const [signupUser, data] = useSignupUserMutation();
  const [userLogin] = useLoginUserMutation();
  console.log('DATA:', data);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const createUser = async values => {
    try {
      await signupUser({
        values,
      });
      await loginUser({
        values,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async values => {
    try {
      await userLogin({
        values,
      });
      dispatch(isAuth(values));
    } catch (error) {
      throw new Error(error);
    }
  };

  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\d/, 'Password must have a number')
      .min(5, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Signup</Text>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            fullName: '',
            email: '',
            password: '',
          }}
          onSubmit={values => createUser(values)}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomInput}
                name="fullName"
                placeholder="Full Name"
              />
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />

              <Button
                onPress={handleSubmit}
                title="SIGN UP"
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#fff',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    paddingBottom: 10,
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
});
