import pandas as pd
import random
from sklearn.model_selection import train_test_split
from FirstDjangoApp.ml_utils.DecisionTreeAlgorithm import DecisionTreeClassifier
import yfinance as yf

#random forest class that uses the decisiontree class to return the prediction of all 10 trees
class RandomForest:
    def __init__(self, num_trees=10):
        self.num_trees = num_trees
        self.decision_trees = []

    def train_model(self, file_path, col_names):
        data = pd.read_csv(file_path, skiprows=1, header=None, names=col_names)
        X = data.iloc[:, :-1].values
        Y = data.iloc[:, -1].values

        for _ in range(self.num_trees):
            X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=random.randint(1, 100))
            classifier = DecisionTreeClassifier(min_samples_split=3, max_depth=3)
            classifier.fit(X_train, Y_train)
            self.decision_trees.append(classifier)
    
    def train_model_yfinance(self, ticker, start_date, end_date):  
    # Fetch finance data using yfinance  
        stock_data = yf.download(ticker,start_date,end_date)  
        print(stock_data)  
        col_names = stock_data.columns.tolist()  
    
        # Calculate the percentage change in the closing price  
        stock_data['Close_pct_change'] = stock_data['Close'].pct_change()  
    
        # Define a threshold value to determine when to buy or not buy the stock  
        threshold = 0.02  
        stock_data['Buy_or_Not'] = (stock_data['Close_pct_change'] > threshold).astype(int)  
    
        # Drop NaN values  
        stock_data = stock_data.dropna()  
    
        # Prepare the data for training  
        X = stock_data[col_names[:-2]].values  
        Y = stock_data['Buy_or_Not'].values  
    
        # Rest of the code remains the same  
        for _ in range(self.num_trees):  
            X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=random.randint(1, 100))  
            classifier = DecisionTreeClassifier(min_samples_split=3, max_depth=3)  
            classifier.fit(X_train, Y_train)  
            self.decision_trees.append(classifier) 

    def random_forest_predict(self, data_point):
        predictions = [tree.predict([data_point])[0] for tree in self.decision_trees]
        return max(set(predictions), key=predictions.count)

