using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Azure.Core;
using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions.Authentication;

namespace WS_Onboarding.Services
{
    public class AppAccessTokenProvider // //IAuthenticationProvider
    {
        /*private readonly ClientSecretCredential _credential;
        private readonly string[] _scopes = new[] { "https://graph.microsoft.com/.default" };

        public AppAccessTokenProvider(IConfiguration config)
        {
            var tenantId = config["AzureAd:TenantId"];
            var clientId = config["AzureAd:ClientId"];
            var clientSecret = config["AzureAd:ClientSecret"];

            _credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
        }
        
        public async Task AuthenticateRequestAsync(
            Microsoft.Kiota.Abstractions.RequestInformation request,
            Dictionary<string, object>? additionalAuthenticationContext = null,
            CancellationToken cancellationToken = default)
        {
            var token = await _credential.GetTokenAsync(
                new TokenRequestContext(_scopes),
                cancellationToken
            );

            Console.WriteLine(token.Token);

            var request1 = new HttpRequestMessage(HttpMethod.Get, "https://graph.microsoft.com/v1.0/users");
            request1.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Token);

            var client = new HttpClient();
            var response = await client.SendAsync(request1);
            Console.WriteLine(response.StatusCode);

            request.Headers.Add("Authorization", $"Bearer {token.Token}");
        }*/
    }
}