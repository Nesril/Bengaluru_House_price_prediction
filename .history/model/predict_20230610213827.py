import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split 
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
import math
import matplotlib.pyplot as plt
from sklearn.svm import SVC
import joblib

data=pd.read_csv("Bengaluru_House_Data.csv")
data=data.drop(["society","availability"],axis=1)
data=data.dropna()
#uniqueArea_type=data["area_type"].unique()
#uniqueLocation=data["location"].unique()

lb_coder=LabelEncoder()
data.area_type=lb_coder.fit_transform(data.area_type)

def is_float(x):
    try:
        float(x)
    except:
        return False
    return True

def clean_total_sqft(x):
     rangeByHyphen=x.split("-")
     if len(rangeByHyphen)==2:
         return (float(rangeByHyphen[0])+float(rangeByHyphen[1]))/2
     try:
        rangeSq=x.split("A")
        return float(rangeSq[0])
     except:
            try:
                rangeAcres=x.split("S")
                return float(rangeAcres[0])
            except:
                return None

#print(data[-data['total_sqft'].apply(is_float)].head(20))
#print(data[data['total_sqft'].str.contains("Cents")])
#print(data.groupby("size")["size"].agg('count'))

data["total_sqft"] = data.total_sqft.apply(clean_total_sqft)
data["bhk_bedroom_Rk"]=data["size"].apply(lambda x: int(x.split(" ")[0]))
data=data.drop(["size"],axis=1)

#print(data.groupby("bhk_bedroom")["bhk_bedroom "].agg('count'))
#print(data[data["bhk_bedroom_Rk"]>20])

'''------------------------feature engineering and dimensionality reduction'''
data["price_per_sqft"]=data["price"]*100000/data["total_sqft"] #1 lak=100000 rupi

'''yo have to remove location bcz. you have around 1304 unique loctions this cause dimensionality curse or caouses higher dimensionaity problem
   there is a better way to handle it. lets come by a catagory called "other" 
    step 1: remove any kind of  space (ending and starting space) => data["location"]=data["location"].apply(lambda x:x.strip())
    step 2: group the column and see the aggregate,data.groupby("size")["size"].agg('count').sort_values(ascending=False)
    step 3: locations that are described poorely ex: bellow 5 or 10 times will be considered as other
'''
data["location"]=data["location"].apply(lambda x:x.strip())
location_stat=data.groupby("location")["location"].agg('count').sort_values(ascending=False)
locations_less_than_10=location_stat[location_stat<=10]
#print(locations_less_than_10)
data.location=data.location.apply(lambda x: "other" if x in locations_less_than_10 else x )
#print(data.location[data.location=="other"])

'''--------------outlier detection and removal --------------------- 
   $ identify what is typical square fit per bedroom. based on that data detect data errors , mean those datas that has less than 1 bedroom in this sqrfit will be detected
    and those  tha have more than one bedroom also be detected
   $ those data points are errors therefore remove them
   $ prices that are too small and too large are removed, how do you know it?
       in data distribution many datas are between mean AND one standard deviation therefore price_per_sqft value that are abbove or bellow this value will be
       dismissed.
       step 1: first see data.price_per_sqft.describe()
       step 2: use the bellow function to filter the value
'''
data_with_outliers=data[(data["total_sqft"]/data["bhk_bedroom_Rk"])<300]
data=data[~((data["total_sqft"]/data["bhk_bedroom_Rk"])<300)]

def dismiss_pps_outliers(data):
    updated_data=pd.DataFrame()
    for  key,singleData in data.groupby("location"):
        mean=np.mean(singleData.price_per_sqft)
        std=np.std(singleData.price_per_sqft)
        new_data = singleData[(singleData.price_per_sqft>(mean-std)) & (singleData.price_per_sqft<=(mean+std))]
        updated_data = pd.concat([updated_data,new_data],ignore_index=True)
    return updated_data         

data=dismiss_pps_outliers(data)

'''-------Data visualization------
   $ visualize some datas that you seuspect their truthness mean s.times
   home with 3 bedrooms may have low price than 1 bedroom. it isn't nessesery
   bcz this can occure with d/t reasons  ...
'''

def visualize_suspecting_data(data,location):
    bhk2=data[(data.location==location) & (data.bhk_bedroom_Rk==2)]
    bhk3=data[(data.location==location) & (data.bhk_bedroom_Rk==3)]
    plt.scatter(bhk2.total_sqft,bhk2.price,color='blue',label='2 BHK', s=50)
    plt.scatter(bhk3.total_sqft,bhk3.price,marker='+', color='green',label='3 BHK', s=50)
    plt.xlabel("Total Square Feet Area")
    plt.ylabel("Price (Lakh Indian Rupees)")
    plt.title(location)
    plt.legend()
    plt.show()

#visualize_suspecting_data(data,"Rajaji Nagar")
#visualize_suspecting_data(data,"Hebbal")

#shows for same location and nearly save squarefit data with bhk==2 have high price than bhk==2 
# this seems impossible therefore you should take it over

def remove_bhk_outliers(df):
    exclude_indices = np.array([])
    for location, location_df in df.groupby('location'):
        bhk_stats = {}
        for bhk, bhk_df in location_df.groupby('bhk_bedroom_Rk'):
            bhk_stats[bhk] = {
                'mean': np.mean(bhk_df.price_per_sqft),
                'std': np.std(bhk_df.price_per_sqft),
                'count': bhk_df.shape[0]
            }
        for bhk, bhk_df in location_df.groupby('bhk_bedroom_Rk'):
            stats = bhk_stats.get(bhk-1)
            if stats and stats['count']>5:
                exclude_indices = np.append(exclude_indices, bhk_df[bhk_df.price_per_sqft<(stats['mean'])].index.values)
    return df.drop(exclude_indices,axis='index')
data = remove_bhk_outliers(data)
#visualize_suspecting_data(data,"Rajaji Nagar")
#visualize_suspecting_data(data,"Hebbal")
#print(data.shape)

'''
know lets see majority of the properties for price per square fit
around 5000 you have high number of data points
the y-axis is histogram number of data points on that catagory.

plt.hist(data.price_per_sqft,rwidth=0.8)
plt.xlabel("Price Per Square Feet")
plt.ylabel("Count")
plt.show()
'''

'''
     RELATION B/N BATHROOMS AND BEDROOMS ONE MAY INCLUDE ANOTHER
     1, plot bar for bathrooms
                plt.hist(data.bath,rwidth=0.8)
                plt.xlabel("bathroom")
                plt.ylabel("Count")
                plt.show()
     2,both comes together therfore ask the company or the owner of the realstate, what should be
     the d/ce b/n bathroom and bedroom, commonly a home with 2 bedrooms won't have bathroom more than
     4. but it maybe different based on the society and the owners but know we choose this common way
'''
data=data[data["bath"]<data["bhk_bedroom_Rk"]+2]
dummies = pd.get_dummies(data.location)
data = pd.concat([data,dummies.drop('other',axis='columns')],axis='columns')#not mandatory to remove other
data=data.drop(["price_per_sqft","location"],axis=1)

''' finally we have finish the boring part, know lets train and test'''
x= data.drop(['price'],axis='columns')
y=data.price
x_train, x_test, y_train, y_test = train_test_split(x,y,test_size=0.2,random_state=0)
print(x.area_type.describe())

lr = LinearRegression()
#if you use any kind of classification model it won't works(error appears)
# bcz it is regession problem and If you are trying to solve a regression 
# problem where the output values are continuous, then you should use a regression 
# model instead of a classification model. For example, you could use `linear regression` or `ridge regression`.
model=lr.fit(x_train,y_train)
accuracy=model.score(x_test,y_test)
print("Accuarcy: ",accuracy)


def predict_price(location,area_type,sqft,bath,balcony,bhk):  
    if area_type>3:
        return "sorry, this Area type is not available"
    try:
        loc_index = np.where(x.columns==location)[0][0]
        array = np.zeros(len(x.columns))
        array[0] = area_type
        array[1] = sqft
        array[2] = bath
        array[3] = balcony
        array[4] = bhk
        if loc_index >= 0:
            array[loc_index] = 1

        return model.predict([array])[0]
    except:
        return "sorry, this location is not available"

print("prediction: ",predict_price('1st Phase JP Nagar',2,1000, 2,2,2))

joblib.dump(model,"predict_model")