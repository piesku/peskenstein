import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {SpecularLayout} from "./layout_specular.js";

let vertex = `
    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
    uniform vec3 eye;
    uniform vec4 color_diffuse;
    uniform vec4 color_specular;
    uniform float shininess;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];

    attribute vec3 position;
    attribute vec3 normal;
    varying vec4 vert_color;

    void main() {
        vec4 vert_pos = world * vec4(position, 1.0);
        vec3 vert_normal = normalize((vec4(normal, 1.0) * self).xyz);
        gl_Position = pv * vert_pos;

        vec3 view_dir = eye - vert_pos.xyz;
        vec3 view_normal = normalize(view_dir);

        // Ambient light.
        vec3 rgb = color_diffuse.rgb * 0.1;

        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (light_positions[i].w == 0.0) {
                break;
            }

            vec3 light_color = light_details[i].rgb;
            float light_intensity = light_details[i].a;

            vec3 light_normal;
            if (light_positions[i].w == 1.0) {
                // Directional light.
                light_normal = light_positions[i].xyz;
            } else {
                vec3 light_dir = light_positions[i].xyz - vert_pos.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(vert_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                rgb += color_diffuse.rgb * diffuse_factor * light_color * light_intensity;

                // Blinn-Phong reflection model.
                vec3 h = normalize(light_normal + view_normal);
                float specular_angle = max(dot(h, vert_normal), 0.0);
                float specular_factor = pow(specular_angle, shininess);

                // Specular color.
                rgb += color_specular.rgb * specular_factor * light_color * light_intensity;
            }
        }

        vert_color = vec4(rgb, 1.0);
    }
`;

let fragment = `
    precision mediump float;

    varying vec4 vert_color;

    void main() {
        gl_FragColor = vert_color;
    }
`;

export function mat1_specular_gouraud(gl: WebGLRenderingContext): Material<SpecularLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,
            Eye: gl.getUniformLocation(program, "eye")!,
            ColorDiffuse: gl.getUniformLocation(program, "color_diffuse")!,
            ColorSpecular: gl.getUniformLocation(program, "color_specular")!,
            Shininess: gl.getUniformLocation(program, "shininess")!,
            LightPositions: gl.getUniformLocation(program, "light_positions")!,
            LightDetails: gl.getUniformLocation(program, "light_details")!,
            VertexPosition: gl.getAttribLocation(program, "position")!,
            VertexNormal: gl.getAttribLocation(program, "normal")!,
        },
    };
}
