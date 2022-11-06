import react from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { withNavigation } from 'react-navigation'
import ResultDetails from "./ResultDetails";

const ResultList = ({ title, result, navigation }) => {

  if(!result || !result.length){
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={result}
        keyExtractor={result => result.id}
        renderItem={({ item }) => {
          return(
            <TouchableOpacity onPress={() => navigation.navigate('ResultShow', { id: item.id})}>
              <ResultDetails result={item}/>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15
  },
  container: {
    marginBottom: 10
  }
});

export default withNavigation(ResultList);
