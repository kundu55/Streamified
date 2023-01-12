package com.example.uipractice.services;

import com.example.uipractice.constants.Constants;
import com.example.uipractice.models.DirectoryDataItem;
import com.example.uipractice.models.ServedDirectoryResponse;
import com.google.gson.JsonObject;

import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface DirectoryService {

    @GET("/server/directory/{dir_owner}")
    Call<List<DirectoryDataItem>> getDirectory(@Path("dir_owner") String dirOwner);

    @GET("/server/directory/{pk}")
    Call<DirectoryDataItem> getDirectoryFromId(@Path("pk") int pk);

    @GET("/server/serveDirectory/{pk}")
    Call<ServedDirectoryResponse> serveDirectory(@Path("pk") int pk);

    @GET("server/directoryContent/{pk}")
    Call<JsonObject> getDirectoryContent(@Path("pk") int pk);

    final OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .readTimeout(5, TimeUnit.SECONDS)
            .connectTimeout(5, TimeUnit.SECONDS)
            .build();

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build();
    DirectoryService service = retrofit.create(DirectoryService.class);
}
