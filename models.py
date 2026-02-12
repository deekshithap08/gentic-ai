from typing import List, Optional
import pydantic
from pydantic import BaseModel
from enum import Enum

class Direction(str, Enum):
    NORTH = "N"
    SOUTH = "S"
    EAST = "E"
    WEST = "W"

class RoomType(str, Enum):
    BEDROOM = "Bedroom"
    KITCHEN = "Kitchen"
    LIVING = "Living"
    DINING = "Dining"
    BATHROOM = "Bathroom"
    STUDY = "Study"
    POOJA = "Pooja"
    STORE = "Store"
    UTILITY = "Utility"
    PARKING = "Parking"
    BALCONY = "Balcony"

class Point(BaseModel):
    x: float
    y: float

class Room(BaseModel):
    id: str
    name: str
    type: RoomType
    width: float
    length: float
    position: Point # Bottom-left corner
    color: str = "#ffffff"
    floor: int = 0  # 0 for Ground, 1 for First, etc.

class MaterialSpec(BaseModel):
    category: str
    name: str
    price_range: str

class CostBreakdown(BaseModel):
    structure_cost: float
    finishing_cost: float
    services_cost: float
    design_fees: float

class InteriorStyle(str, Enum):
    MODERN = "Modern"
    LUXURY = "Luxury"
    MINIMALIST = "Minimalist"
    TRADITIONAL = "Traditional"

class Layout(BaseModel):
    id: str
    name: str
    width: float
    length: float
    rooms: List[Room]
    style: InteriorStyle = InteriorStyle.MODERN
    total_area: float
    cost_estimate: float
    cost_breakdown: CostBreakdown
    material_suggestions: List[MaterialSpec]
    ai_score: float
    space_efficiency_score: float = 0.0

class GenerationRequest(BaseModel):
    plot_length: float
    plot_width: float
    floors: int
    budget: float
    facing: Optional[Direction] = None
    bedrooms: int
    bathrooms: int
    kitchen_type: str
    living_room_size: str
    dining: str
    study_room: bool
    pooja_room: bool
    utility_room: bool
    store_room: bool
    vastu_compliance: str
    parking: str
    balcony: str
