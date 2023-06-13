import pickle
import sys
from predict import predict_price
from predict import accuracy_of_model
import joblib
model = joblib.load('predict_model.pkl')
#predict = predict_price(model,sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6]))
predict=predict_price('1st Phase JP Nagar',2,1000, 2,2,2)
print({"prediction":predict,"accuarcy":accuracy_of_model()})
if predict.isnumeric():
    print("Prediction: ",predict)
else:
    print(predict)
print("Accuracy: ",accuracy_of_model(model))