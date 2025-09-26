import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/color';
import metrics from '../constants/metrics';

interface WalletCardProps {
  balance: number;
  onAddMoney: () => void;
  onWithdraw: () => void;
  currency?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  onAddMoney,
  onWithdraw,
  currency = '₹',
}) => {
  const formatBalance = (amount: number) => {
    return `${currency}${amount.toLocaleString('en-IN')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Wallet Balance</Text> */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{formatBalance(balance)}</Text>
          <Text style={styles.balanceLabel}>Available Balance</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={onAddMoney}>
          <Text style={styles.addButtonText}>+ Add Amount</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.withdrawButton} onPress={onWithdraw}>
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(20),
    padding: metrics.padding(24),
    marginHorizontal: metrics.marginHorizontal(16),
    marginVertical: metrics.marginVertical(12),
    shadowColor: Colors.MAIN_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: metrics.marginBottom(24),
  },
  title: {
    fontSize: metrics.fontSize(20),
    fontWeight: '700',
    color: Colors.CHARCOAL_GRAY,
    marginBottom: metrics.marginBottom(12),
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: metrics.fontSize(24),
    fontWeight: 'bold',
    color: Colors.MAIN_COLOR,
    marginBottom: metrics.marginBottom(6),
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  balanceLabel: {
    fontSize: metrics.fontSize(14),
    color: Colors.DARK_GREY,
    fontWeight: '500',
    opacity: 0.8,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: metrics.gap(12),
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.BUTTON_BACKGROUND,
    borderRadius: metrics.borderRadius(12),
    paddingVertical: metrics.paddingVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.MAIN_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.WHITE,
    letterSpacing: 0.5,
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: metrics.borderRadius(12),
    paddingVertical: metrics.paddingVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: metrics.borderWidth(1),
    borderColor: Colors.LIGHT_GREY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  withdrawButtonText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
    letterSpacing: 0.5,
  },
});

export default WalletCard;
