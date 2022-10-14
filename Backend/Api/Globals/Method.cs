using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace Backend.Globals
{
    public class Method
    {
        public static string exec(string request)
        {
            SqlDataAdapter da;
            DataTable dt = new DataTable();
            da = new SqlDataAdapter(request, Connection.ConnectionString);
            da.Fill(dt);
            ModGlb.Response = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return ModGlb.Response;
        }

        public static string update(string request)
        {
            SqlConnection conn = new SqlConnection(Connection.ConnectionString);
            conn.Open();
            SqlCommand comando = new SqlCommand(request, conn);
            comando.ExecuteNonQuery();
            conn.Close();
            ModGlb.Response = JsonConvert.SerializeObject("ok", Formatting.Indented);
            return ModGlb.Response;
        }
    }
}
