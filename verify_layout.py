import sys
import os

# Add current dir to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from ai_engine import models
    from ai_engine import generator
    from ai_engine.models import GenerationRequest, Direction
    from ai_engine.generator import generate_layout_variants
except (ImportError, ValueError, SystemError):
    import models
    import generator
    from models import GenerationRequest, Direction
    from generator import generate_layout_variants

def test_layout_generation():
    request = GenerationRequest(
        plot_length=40.0,
        plot_width=30.0,
        floors=2,
        budget=5000000,
        facing=Direction.NORTH,
        bedrooms=3,
        bathrooms=3,
        kitchen_type="Modular",
        living_room_size="Large",
        dining="Separate",
        study_room=True,
        pooja_room=True,
        utility_room=True,
        store_room=True,
        vastu_compliance="High",
        parking="1 Car",
        balcony="Yes"
    )
    
    variants = generate_layout_variants(request)
    print(f"Generated {len(variants)} variants.")
    
    for i, layout in enumerate(variants):
        print(f"\nVariant {i+1} ({layout.name}):")
        print(f"  Total Area: {layout.total_area} sqft")
        print(f"  Estimated Cost: {layout.cost_estimate}")
        
        # Check for overlaps (simplified check)
        rooms = layout.rooms
        overlaps = []
        for j in range(len(rooms)):
            for k in range(j + 1, len(rooms)):
                r1 = rooms[j]
                r2 = rooms[k]
                
                # Simple AABB overlap check
                if r1.floor == r2.floor:
                    if (r1.position.x < r2.position.x + r2.width and
                        r1.position.x + r1.width > r2.position.x and
                        r1.position.y < r2.position.y + r2.length and
                        r1.position.y + r1.length > r2.position.y):
                        overlaps.append((r1.name, r2.name))
        
        if overlaps:
            print(f"  ALERT: Overlaps found: {overlaps}")
        else:
            print("  No overlaps detected.")

if __name__ == "__main__":
    test_layout_generation()
