import pickle
import sys
from predict import predict_price
from predict import accuracy_of_models
import joblib
model = joblib.load('predict_model')
predict = predict_price('1st Phase JP Nagar',2,1000, 2,2,2)

print("prediction: ",predict)
print("Accuarcy: ",accuracy_of_model())