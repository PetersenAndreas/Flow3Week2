package rest;

import com.google.gson.Gson;
import dto.DadDTO;
import dto.MyDTO;
import dto.NorrisDTO;
import java.io.IOException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {

    @Context
    private UriInfo context;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJokes() throws IOException {
        Gson gson = new Gson();
        String norrisJoke = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        NorrisDTO norrisDTO = gson.fromJson(norrisJoke, NorrisDTO.class);

        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
        DadDTO dadDTO = gson.fromJson(dad, DadDTO.class);

        MyDTO myDTO = new MyDTO(dadDTO, norrisDTO);

        //This is what your endpoint should return       
        String combinedJSON = gson.toJson(myDTO);
        return combinedJSON;

    }

}
