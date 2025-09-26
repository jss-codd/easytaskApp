import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RazorpayCheckout from 'react-native-razorpay';
import metrics from '../../constants/metrics'
import Colors from '../../constants/color'
import WalletCard from '../../components/WalletCard'
import { CustomModal } from '../../components/CustomModal'
import { addWalletBalance, getWallet, verifyPayment } from '../../service/apiService'
import { RootState, useAppSelector } from '../../store/store';
import { Toast } from '../../components/CommonToast';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

const Wallet = () => {
  const [balance, setBalance] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Task Payment', amount: 500, date: '2 days ago', type: 'credit' },
    { id: '2', title: 'Withdrawal', amount: 200, date: '1 week ago', type: 'debit' },
    { id: '3', title: 'Task Payment', amount: 750, date: '2 weeks ago', type: 'credit' },
    { id: '4', title: 'Refund', amount: 150, date: '3 weeks ago', type: 'credit' },
  ]);
  const { user: authUser } = useAppSelector((state: RootState) => state.authReducer);

const getWalletBalance = async () => {
  const response = await getWallet();
  console.log('response', response);
  setBalance(response.balance);
}

useEffect(() => {
  getWalletBalance();
}, [authUser?.id]);

  const handlePayment = async (amount: number) => {
    try {
      setLoading(true);

      const order = await addWalletBalance({ amount });
      // console.log("Order created:", order);
      const options = {
        key: "rzp_test_GJa37P0PEutzSu",
        amount: order.amount,
        currency: order.currency,
        name: "Easy Tasker",
        description: "Add Funds to Wallet",
        order_id: order.id,
        prefill: {
          name: authUser?.name || "",
          email: authUser?.email || "",
          contact: authUser?.phone || "",
        },
        theme: { color: "#3399cc" },
      };

      const data = await RazorpayCheckout.open(options as any);
      // console.log("Payment Success:", data);
      const payload = {
        orderId: data.razorpay_order_id,
        paymentId: data.razorpay_payment_id,
        signature: data.razorpay_signature,
      }
      // console.log('payload', payload);
      const verifyRes = await verifyPayment(payload);
    
      if (verifyRes.success) {
        addAmount(amount); 
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Funds added successfully ',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: verifyRes.message,
        });
      }
    } catch (error: any) {
      console.error("Payment Error:", error?.response?.data?.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.description || 'Payment failed',
      });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleWithdraw = () => {
    if (balance <= 0) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance to withdraw.');
      return;
    }

    Alert.alert(
      'Withdraw Money',
      'Choose amount to withdraw from your wallet',
      [
        { text: '₹100', onPress: () => withdrawAmount(100) },
        { text: '₹500', onPress: () => withdrawAmount(500) },
        { text: '₹1000', onPress: () => withdrawAmount(1000) },
        { text: 'All Balance', onPress: () => withdrawAmount(balance) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const addAmount = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const withdrawAmount = (amount: number) => {
    if (amount > balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance.');
      return;
    }
    setBalance(prev  => prev - amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: 'Withdrawal',
      amount: amount,
      date: 'Just now',
      type: 'debit'
    };
    setTransactions(prev => [newTransaction, ...prev]);
    Alert.alert('Success', `₹${amount} withdrawn from your wallet successfully!`);
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.MAIN_COLOR]}
            tintColor={Colors.MAIN_COLOR}
          />
        }
      >
        <WalletCard
          balance={balance}
          onAddMoney={() => setShowModal(true)}
          onWithdraw={handleWithdraw}
          currency="₹"
        />
        <View style={styles.transactionSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'debit' ? styles.transactionAmountNegative : styles.transactionAmountPositive
              ]}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
              </Text>
            </View>
          ))}

          {transactions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No transactions yet</Text>
              <Text style={styles.emptyStateSubtext}>Your transaction history will appear here</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        type="custom"
        title="Add Amount"
        placeholder="Enter amount to add to your wallet"
        value={amount.toString()}
        onChangeText={(text) => setAmount(text)}
        onAccept={() => {
          const amt = Number(amount);
          if (!amt || amt <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount.');
            return;
          }
          handlePayment(amt);
          setShowModal(false);
        }}
        onReject={() => setShowModal(false)}
      />
      
    </SafeAreaView>
  )
}

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingTop: metrics.paddingTop(16),
  },
  transactionSection: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: metrics.marginHorizontal(16),
    marginTop: metrics.marginTop(16),
    marginBottom: metrics.marginBottom(20),
    borderRadius: metrics.borderRadius(20),
    padding: metrics.padding(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.marginBottom(16),
  },
  sectionTitle: {
    fontSize: metrics.fontSize(16),
    fontWeight: '700',
    color: Colors.CHARCOAL_GRAY,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: metrics.paddingVertical(10),
    borderBottomWidth: metrics.borderWidth(0.5),
    borderBottomColor: Colors.LIGHT_GREY,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: metrics.fontSize(12),
    fontWeight: '600',
    color: Colors.CHARCOAL_GRAY,
    marginBottom: metrics.marginBottom(4),
  },
  transactionDate: {
    fontSize: metrics.fontSize(10),
    color: Colors.DARK_GREY,
    opacity: 0.8,
  },
  transactionAmount: {
    fontSize: metrics.fontSize(14),
    fontWeight: '700',
  },
  transactionAmountPositive: {
    color: Colors.SUCCESS_GREEN,
  },
  transactionAmountNegative: {
    color: Colors.RED_ERROR,
  },
  viewAllText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.MAIN_COLOR,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: metrics.paddingVertical(40),
  },
  emptyStateText: {
    fontSize: metrics.fontSize(14),
    fontWeight: '600',
    color: Colors.DARK_GREY,
    marginBottom: metrics.marginBottom(8),
  },
  emptyStateSubtext: {
    fontSize: metrics.fontSize(14),
    color: Colors.DARK_GREY,
    opacity: 0.7,
    textAlign: 'center',
  },
});