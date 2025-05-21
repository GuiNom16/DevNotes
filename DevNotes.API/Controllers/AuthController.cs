using DevNotes.Infrastructure.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DevNotes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthSettings _authSettings;

        public AuthController(AuthSettings authSettings)
        {
            _authSettings = authSettings;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Temporary: validate against hardcoded credentials
            if (request.Username != "admin" || request.Password != "password")
            {
                return Unauthorized();
            }

            var claims = new[]
            {
            new Claim(ClaimTypes.Name, request.Username)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _authSettings.Issuer,
                _authSettings.Audience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(_authSettings.ExpiryMinutes),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new { token = jwt });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

}
