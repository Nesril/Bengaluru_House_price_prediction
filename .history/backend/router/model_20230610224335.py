import pickle
import sys
from predict import predict_price
import joblib
model = joblib.load('my_model_knn.pkl.pkl')
predict = predict_price('1st Phase JP Nagar',2,1000, 2,2,2)

print("prediction: ",predict)