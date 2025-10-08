import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RateProps {
    maxStars?: number;
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
}

export const Rate: React.FC<RateProps> = ({
    maxStars = 5,
    initialRating = 0,
    onRatingChange,
}) => {
    const [rating, setRating] = useState(initialRating);

    const handlePress = (index: number) => {
        const newRating = index + 1;
        setRating(newRating);
        if (onRatingChange) onRatingChange(newRating);
    };

    return (
        <View style={styles.ratingRow}>
            {Array.from({ length: maxStars }, (_, i) => (
                <TouchableOpacity key={i} onPress={() => handlePress(i)}>
                    <Text style={i < rating ? styles.starFilled : styles.starEmpty}>
                        ★
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starFilled: {
        color: '#FFD700', // Gold
        fontSize: 28,
        marginHorizontal: 3,
    },
    starEmpty: {
        color: '#ccc', // Light gray
        fontSize: 28,
        marginHorizontal: 3,
    },
});
