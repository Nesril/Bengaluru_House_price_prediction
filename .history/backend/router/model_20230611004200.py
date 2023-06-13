import pickle
import sys
from predict import predict_price
from predict import accuracy_of_model
import joblib
model = joblib.load('predict_model.pkl')
#predict = predict_price(model,sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6]))
predict=predict_price(model,'1st Phase JP Nagar',2,1000,2,2,2)
if isinstance(predict, (float, int)):
  print("Prediction: ",round(predict,2))
else:
    print(predict)
print("Accuracy: ",round(accuracy_of_model(model),4)*100,"%")