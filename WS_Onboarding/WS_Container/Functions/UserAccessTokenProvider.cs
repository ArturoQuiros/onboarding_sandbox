using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Web;
using Microsoft.Kiota.Abstractions.Authentication;

namespace WS_Onboarding.Functions
{ 
    public class UserAccessTokenProvider : IAuthenticationProvider
    {
        private readonly ITokenAcquisition _tokenAcquisition;

        public UserAccessTokenProvider(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        public async Task AuthenticateRequestAsync(
            Microsoft.Kiota.Abstractions.RequestInformation request,
            Dictionary<string, object>? additionalAuthenticationContext = null,
            CancellationToken cancellationToken = default)
        {
            var scopes = new[] { "https://graph.microsoft.com/User.Read.All" };

            // Usa ITokenAcquisition para obtener el token real
            var accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes, authenticationScheme: "AzureAD");

            request.Headers["Authorization"] = new[] { $"Bearer {accessToken}" };
        }
    }
}