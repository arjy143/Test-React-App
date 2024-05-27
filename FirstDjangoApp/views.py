from django.shortcuts import render  
from django.http import JsonResponse  
from FirstDjangoApp.ml_utils.RandomForest import RandomForest  
  
def train_model_view(request):  
    ticker = request.GET.get('ticker')  # Get ticker parameter from the request  
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    rf_model = RandomForest(num_trees=10)  
  
    # Call the train_model_yfinance method on the instance  
    rf_model.train_model_yfinance(ticker, start_date, end_date)  
    sample_data_point = [133.520004, 133.610001, 126.760002, 129.410004, 127.002106, 143301900]  
    prediction = rf_model.random_forest_predict(sample_data_point)  
  
    # Convert the prediction to a JSON-serializable format  
    prediction_json = prediction.tolist()  
  
    return JsonResponse({'status': 'success', 'message': 'Model trained successfully.', 'prediction': prediction_json})  
