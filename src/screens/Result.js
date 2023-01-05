import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../components/Title';

const Result = ({navigation, route}) => {
  const {score} = route.params;

  const resultBanner =
    score > 10
      ? 'https://cdni.iconscout.com/illustration/premium/thumb/happy-sports-team-celebrate-victory-and-success-4705008-3937430.png'
      : 'https://cdni.iconscout.com/illustration/premium/thumb/startup-failed-2225148-1851972.png';

  return (
    <View style={styles.container}>
      <Title titleText="RESULTS" />
      <Text style={styles.scoreText}>{score}</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: resultBanner,
          }}
          style={styles.banner}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  banner: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#184E77',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '800',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Result;
