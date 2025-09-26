import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/color';
import LocationIcon from '../../Icons/LocationIcon';
import { Location, User } from '../../utils/type';
import metrics from '../../constants/metrics';
import { UnsaveIcon, SaveIcon } from '../../Icons/SaveIcon';
import { Chip, Rating, VerifiedBadge } from '../../components/CustomComponents';
import { getBidRange } from '../../utils/helper';
import { UserRole } from '../../utils/enums';
import FONT_FAMILY from '../../constants/FontFamily';

interface JobCardProps {
  title: string;
  description: string;
  budget: number | string;
  location: Location;
  paymentVerified: boolean;
  postedTime: string;
  onViewBids: () => void;
  onSave: () => void;
  viewButtonText: string;
  bidCount?: string;
  owner?: User;
  selectedCategories?: any;
  isSaved?: boolean;
  role?: string;
}

const JobCard = ({
  title,
  description,
  budget,
  location,
  paymentVerified,
  postedTime,
  onViewBids,
  onSave,
  viewButtonText,
  bidCount,
  owner,
  selectedCategories,
  isSaved,
  role,
}: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => setExpanded(prev => !prev);

  const shouldShowButton = description.length > 150; 

  return (
    <TouchableOpacity style={styles.card} onPress={onViewBids}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <Text style={styles.postedTime}>{`Posted ${postedTime}`}</Text>
        {paymentVerified && (
          <VerifiedBadge />
          // <View style={styles.row}>     
          //   <Text style={styles.verifiedIcon}>✔</Text>
          //   <Text style={styles.verifiedText}> Payment Verified</Text>
          // </View>
        )}
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.title}>{title} </Text>
        <Rating stars={owner?.profile.rating || 0} />
      </View>

      <View style={[styles.row, { flex: 1 }]}>
        <LocationIcon color="gray" size={15} />
        <Text style={styles.locationText}>
          {location.city}, {location.state}
        </Text>
      </View>

      <View style={[styles.badgeRow]}>
        <Text style={styles.budget}>
          <Text style={{ fontWeight: '500' }}>Budget : {budget} </Text>
        </Text>
        <View style={styles.appliedBadge}>
          <Text style={styles.appliedBadgeText}>
            Bids: {getBidRange(Number(bidCount))}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: metrics.marginTop(5),
        }}
      >
        {selectedCategories?.map((category: any) => (
          <React.Fragment key={category.id}>
            <Chip text={category.name} />

            {category?.subCategories?.map((sub: any) => (
              <Chip key={sub.id} text={sub.name} />
            ))}
          </React.Fragment>
        ))}
      </View>

      {/* <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
        {description}
      </Text>

      {shouldShowButton && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.showMore}>
            {expanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )} */}
      {role === UserRole.Tasker && (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onViewBids}>
          <Text style={styles.buttonText}>{viewButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onSave}>
          {isSaved ? (
            <SaveIcon size={22} color={Colors.MAIN_COLOR} />
          ) : (
            <UnsaveIcon size={22} color={Colors.MAIN_COLOR} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    padding: metrics.padding(15),
    borderRadius: metrics.borderRadius(10),
    marginBottom: metrics.marginBottom(10),
    position: 'relative',
    shadowColor: Colors.CHARCOAL_GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: metrics.fontSize(14),
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
    flex: 1,
    // fontFamily:FONT_FAMILY.EXTRA_BOLD
  },
  postedTime: {
    color: Colors.LINK_COLOR,
    fontSize: metrics.fontSize(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.marginTop(6),
  },
  verifiedText: {
    color: 'green',
    fontSize: metrics.fontSize(10),
  },
  locationText: {
    fontSize: metrics.fontSize(10),
    color: Colors.DARK_GREY,
    marginLeft: metrics.marginLeft(3),
    flexShrink: 1,
  },
  budget: {
    marginTop: metrics.marginTop(6),
    fontSize: metrics.fontSize(10),
    color: Colors.DARK_GREY,
  },
  description: {
    marginTop: metrics.marginTop(6),
    fontSize: metrics.fontSize(11),
    color: Colors.DARK_GREY,
  },
  showMore: {
    marginTop: metrics.marginTop(4),
    color: Colors.BUTTON_BACKGROUND,
    fontSize: metrics.fontSize(11),
    fontWeight: 'medium',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: metrics.gap(15),
  },
  iconButton: {
    backgroundColor: Colors.BACKGROUND,
    padding: metrics.padding(5),
    borderRadius: metrics.borderRadius(6),
    alignItems: 'center',
    marginTop: metrics.marginTop(12),
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: metrics.marginTop(12),
    borderRadius: metrics.borderRadius(6),
    backgroundColor: Colors.BUTTON_BACKGROUND,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: metrics.fontSize(12),
  },
  appliedBadge: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: metrics.paddingHorizontal(1),
    paddingVertical: metrics.paddingVertical(2),
    borderRadius: metrics.borderRadius(12),
    alignItems: 'center',
    width: metrics.width(70),
    flexDirection: 'row',
  },
  appliedBadgeText: {
    textAlign: 'center',
    flex: 1,
    color: Colors.DARK_GREY,
    fontWeight: '500',
    fontSize: metrics.fontSize(11),
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
