import pickle
import sys
from predict import predict_price
from predict import accuracy_of_model
import joblib
model = joblib.load('predict_model.pkl')
print(sys.argv[1],sys.argv[2],sys.argv[2],sys.argv[4],sys.argv[5],sys.argv[6])
predict = predict_price('1st Phase JP Nagar',2,1000, 2,2,2)

print("prediction: ",predict)
print("Accuarcy: ",accuracy_of_model())