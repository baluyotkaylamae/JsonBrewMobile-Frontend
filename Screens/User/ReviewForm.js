import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { Rating } from "react-native-ratings";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import Toast from "react-native-toast-message";

const ReviewForm = ({ productId, orderId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please provide a rating",
      });
      return;
    }

    axios
      .post(`${baseURL}reviews/${productId}/review/${orderId}`, {
        rating,
        comment,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            type: "success",
            text1: "Review added successfully",
          });
          // Reset fields after successful submission
          setRating(0);
          setComment("");
        }
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to add review. Please try again later.",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rating</Text>
      <Rating
        startingValue={rating}
        onFinishRating={setRating}
        imageSize={30}
        style={{ paddingVertical: 10 }}
      />
      <Text style={styles.label}>Comment</Text>
      <Input
        placeholder="Enter your comment"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />
      <EasyButton primary large onPress={submitReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </EasyButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReviewForm;
