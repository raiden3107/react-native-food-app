import react from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const ResultDetails = ({ result }) => {
  return (
    <View style={styles.container} >
      <Image style={styles.imageStyle} source={{uri: result.image_url}} />
      <Text style={styles.textStyle} >{result.name}</Text>
      <Text>Rating {result.rating}, review {result.review_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 250,
        height: 200,
        borderRadius: 5
    },
    container: {
        marginLeft: 15
    },
    textStyle: {
        fontWeight: 'bold'
    }
})

export default ResultDetails;
