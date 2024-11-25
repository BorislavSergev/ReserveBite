using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReserveBite.Api.Data;
using ReserveBite.Api.Models;

namespace ReserveBite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all-restaurants")]
        public async Task<IActionResult> GetAllRestaurants()
        {
            var result = await _context.Restaurants.ToListAsync();

            return Ok(result);
        }

        [HttpPost("create-restaurant")]
        public async Task<IActionResult> CreateRestaurant([FromBody] Restaurant restaurant)
        {
            // Validate incoming data
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email (link restaurant to the user)
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == restaurant.Email);
            if (user == null)
            {
                return NotFound(new { error = "User not found." });
            }

            // Link the restaurant to the user
            //restaurant.UserId = user.Id;

            // Add the restaurant to the database
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Restaurant created successfully." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(r => r.Id == id);

            if (restaurant == null)
            {
                return NotFound("Restaurant not found.");
            }

            return Ok(restaurant);
        }
    }
}
