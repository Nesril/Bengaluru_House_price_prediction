import pickle
import sys
from predict import predict_price
from predict import accuracy_of_model
import joblib
model = joblib.load('predict_model.pkl')
predict = predict_price(model,sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6]))
if isinstance(predict, (float, int)):
  print("Prediction: ",round(predict,3),"₹ lakh")
else:
    print(predict)
print("Accuracy: ",round(accuracy_of_model(model)*100,3),"%")